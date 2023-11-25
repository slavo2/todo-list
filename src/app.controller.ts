import { Controller, Get, HttpCode, HttpStatus, Redirect } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {

  @Public()
  @Get()
  @HttpCode(HttpStatus.SEE_OTHER)
  @ApiResponse({ status: HttpStatus.SEE_OTHER, description: 'Redirect to API documentation.' })
  @Redirect('/api', HttpStatus.SEE_OTHER)
  redirectRootToApiDocs() { }  
}
