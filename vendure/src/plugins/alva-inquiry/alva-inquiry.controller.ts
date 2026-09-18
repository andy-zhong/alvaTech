import { Body, Controller, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AlvaInquiryService, AlvaInquiryValidationError } from './alva-inquiry.service';

@Controller()
export class AlvaInquiryController {
    constructor(private inquiryService: AlvaInquiryService) {}

    @Post('api/b2b')
    submitB2b(
        @Body() body: Record<string, unknown>,
        @Headers('origin') origin?: string,
        @Headers('referer') referer?: string,
        @Headers('user-agent') userAgent?: string,
    ) {
        return this.submit({ ...body, source: 'b2b' }, { origin, referer, userAgent });
    }

    @Post('api/quote')
    submitQuote(
        @Body() body: Record<string, unknown>,
        @Headers('origin') origin?: string,
        @Headers('referer') referer?: string,
        @Headers('user-agent') userAgent?: string,
    ) {
        return this.submit({ ...body, source: 'quote-widget' }, { origin, referer, userAgent });
    }

    private async submit(body: Record<string, unknown>, meta: { origin?: string; referer?: string; userAgent?: string }) {
        try {
            return await this.inquiryService.submit(body, meta);
        } catch (error) {
            if (error instanceof AlvaInquiryValidationError) {
                throw new HttpException({ success: false, error: error.message, fields: error.fields }, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
}
