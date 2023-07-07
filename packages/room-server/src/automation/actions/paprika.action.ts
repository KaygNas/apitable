import { IJsonSchema } from '@apitable/core';
import { AutomationAction } from './decorators/automation.action.decorator';
import { IActionResponse } from './interface/action.response';
import { IBaseAction, IUiSchema } from './interface/base.action';
import { ResponseStatusCodeEnums } from './enum/response.status.code.enums';
import { appendFile } from 'fs/promises';
import { join } from 'path';
import dayjs from 'dayjs';

const LOG_FILE_PATH = join(__dirname, './paprika.action.log');

@AutomationAction('Tell Paprika', { description: 'Leave Paprika a message and she would reply ASAP!' })
export class PaprikaAction implements IBaseAction {
  async endpoint(input: any): Promise<IActionResponse<any>> {
    const message = `[${dayjs().format()}] Recieve a new message: ${input.message}\n`;

    await appendFile(LOG_FILE_PATH, message, {
      encoding: 'utf-8',
    }).catch((err) => {
      console.error('[Paprika Action]:', err);
    });

    return Promise.resolve({ success: true, code: ResponseStatusCodeEnums.Success, data: { data: input }});
  }

  getInputSchema(): IJsonSchema {
    return {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          title: 'message',
        },
      },
    };
  }

  getOutputSchema(): IJsonSchema {
    return {};
  }

  getUISchema(): IUiSchema {
    return {};
  }
}
