import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    const clientIp = req.ips[0] ?? req.ip;

    return Promise.resolve(clientIp ?? 'unknown');
  }
}
