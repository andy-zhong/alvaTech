import {
    Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
    Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
    api, defineDashboardExtension, graphql,
} from '@vendure/dashboard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trans, useLingui } from '@lingui/react/macro';
import { Inbox } from 'lucide-react';
import { useState } from 'react';

const inquiriesDocument = graphql(`
    query AlvaInquiries($options: AlvaInquiryListOptions) {
        alvaInquiries(options: $options) {
            totalItems
            items {
                id createdAt reference source status company contact email phone message
                pageUrl notificationStatus notificationError
            }
        }
    }
`);

const updateStatusDocument = graphql(`
    mutation UpdateAlvaInquiryStatus($id: ID!, $status: String!) {
        updateAlvaInquiryStatus(id: $id, status: $status) { id status }
    }
`);

const statuses = ['NEW', 'CONTACTED', 'QUOTED', 'CLOSED'];

function InquiriesPage() {
    const { t } = useLingui();
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['alva-inquiries', status, search],
        queryFn: () => api.query(inquiriesDocument, {
            options: { take: 100, status: status || undefined, search: search || undefined },
        }),
    });
    const updateStatus = useMutation({
        mutationFn: (input: { id: string; status: string }) => api.mutate(updateStatusDocument, input),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alva-inquiries'] }),
    });
    const result = query.data?.alvaInquiries;
    const statusLabels: Record<string, string> = {
        NEW: t`New`,
        CONTACTED: t`Contacted`,
        QUOTED: t`Quoted`,
        CLOSED: t`Closed`,
    };
    const notificationLabels: Record<string, string> = {
        PENDING: t`Pending`,
        SENT: t`Sent`,
        SKIPPED: t`Skipped`,
        FAILED: t`Failed`,
    };

    return (
        <div className="p-6 space-y-5">
            <div>
                <h1 className="text-2xl font-semibold"><Trans>Website inquiries</Trans></h1>
                <p className="text-muted-foreground"><Trans>Requests submitted through the B2B form and floating quote widget.</Trans></p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{result?.totalItems ?? 0} <Trans>inquiries</Trans></CardTitle>
                    <CardDescription><Trans>Email delivery state is shown separately from sales follow-up state.</Trans></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                        <Input value={search} onChange={event => setSearch(event.target.value)} placeholder={t`Search reference, company, contact or message`} className="max-w-md" />
                        <select value={status} onChange={event => setStatus(event.target.value)} className="h-9 rounded-md border bg-background px-3 text-sm">
                            <option value="">{t`All statuses`}</option>
                            {statuses.map(item => <option key={item} value={item}>{statusLabels[item]}</option>)}
                        </select>
                        <Button variant="outline" onClick={() => query.refetch()} disabled={query.isFetching}><Trans>Refresh</Trans></Button>
                    </div>
                    {query.isLoading ? <p className="py-8 text-muted-foreground"><Trans>Loading inquiries…</Trans></p> : null}
                    {query.error ? <p className="py-8 text-destructive"><Trans>Unable to load inquiries:</Trans> {String(query.error)}</p> : null}
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader><TableRow><TableHead><Trans>Received</Trans></TableHead><TableHead><Trans>Reference / source</Trans></TableHead><TableHead><Trans>Contact</Trans></TableHead><TableHead><Trans>Request</Trans></TableHead><TableHead><Trans>Email</Trans></TableHead><TableHead><Trans>Follow-up</Trans></TableHead></TableRow></TableHeader>
                            <TableBody>
                                {(result?.items ?? []).map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className="whitespace-nowrap align-top">{new Date(item.createdAt).toLocaleString()}</TableCell>
                                        <TableCell className="align-top"><div className="font-medium">{item.reference}</div><div className="text-xs text-muted-foreground">{item.source}</div></TableCell>
                                        <TableCell className="align-top min-w-52"><div className="font-medium">{item.company || item.contact || '—'}</div><div>{item.contact}</div>{item.email ? <a className="block text-primary" href={`mailto:${item.email}`}>{item.email}</a> : null}{item.phone ? <a className="block" href={`tel:${item.phone}`}>{item.phone}</a> : null}</TableCell>
                                        <TableCell className="align-top min-w-80"><details><summary className="cursor-pointer line-clamp-2">{item.message}</summary><div className="mt-2 whitespace-pre-wrap text-sm">{item.message}</div>{item.pageUrl ? <a href={item.pageUrl} target="_blank" rel="noreferrer" className="mt-2 block text-xs text-primary"><Trans>Source page</Trans></a> : null}</details></TableCell>
                                        <TableCell className="align-top"><Badge variant={item.notificationStatus === 'SENT' ? 'default' : 'secondary'}>{notificationLabels[item.notificationStatus] || item.notificationStatus}</Badge>{item.notificationError ? <div className="mt-2 max-w-56 text-xs text-destructive">{item.notificationError}</div> : null}</TableCell>
                                        <TableCell className="align-top"><select value={item.status} disabled={updateStatus.isPending} onChange={event => updateStatus.mutate({ id: item.id, status: event.target.value })} className="h-9 rounded-md border bg-background px-2 text-sm">{statuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}</select></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {!query.isLoading && !result?.items.length ? <p className="py-8 text-center text-muted-foreground"><Trans>No inquiries found.</Trans></p> : null}
                </CardContent>
            </Card>
        </div>
    );
}

defineDashboardExtension({
    navSections: [{ id: 'alva-sales', title: 'Alva sales', icon: Inbox, placement: 'top', order: 30 }],
    routes: [{
        path: '/alva-inquiries',
        component: () => <InquiriesPage />,
        navMenuItem: { sectionId: 'alva-sales', id: 'alva-inquiries', title: 'Website inquiries' },
    }],
});
