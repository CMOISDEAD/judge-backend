import { Body, Controller, Post } from '@nestjs/common';
import { CodeService } from './code.service';
import { Code, CodeOutput } from './interfaces/code.interface';

@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) { }

  @Post()
  async testCode(@Body() data: Code): Promise<CodeOutput> {
    const { code, lang, expected } = data;
    try {
      const output = await this.codeService.create(code, lang);
      return {
        message: 'container successfully created',
        output: output.slice(8, -1),
        passed: output.slice(8, -1) == `${expected}`,
      };
    } catch (e) {
      console.error(e);
      return {
        message: 'internal server error',
        output: 'please try again',
        passed: false,
      };
    }
  }
}
