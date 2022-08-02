import { Module } from '@nestjs/common'

import { ElementModule } from '../element/element.module'
// import { ElementService } from '../element/element.service'

// import { ImpYamlService } from './imp-yaml.service'
// import { ImpXlsxService } from './imp-xlsx.service'
import { ImpCsvService } from './imp-csv.service'
// import { ImpService } from './imp.service'

@Module({
  imports: [ElementModule],
  providers: [
    // ImpYamlService, ImpXlsxService,
    // ElementService,
    ImpCsvService,
    // ImpService,
  ],
  exports: [
    // ImpYamlService, ImpXlsxService,
    ImpCsvService,
    // ImpService,
  ],
})
export class ImpModule {}
