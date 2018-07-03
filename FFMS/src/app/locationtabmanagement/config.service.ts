import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {

    private config:boolean = true;

    setOption(value) {
        this.config = value;
    }

    getConfig() {
        return this.config;
    }
}