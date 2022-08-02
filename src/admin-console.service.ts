import { Injectable } from '@nestjs/common'
import { ConsoleService } from 'nestjs-console'

// import { ImpYamlService } from './imp/imp-yaml.service'
// import { ImpXlsxService } from './imp/imp-xlsx.service'
import { ImpCsvService } from './imp/imp-csv.service'

@Injectable()
export class AdminConsoleService {
  constructor(
    private readonly consoleService: ConsoleService,
    // private readonly impYamlService: ImpYamlService,
    // private readonly impXlsxService: ImpXlsxService,
    private readonly impCsvService: ImpCsvService,
  ) {
    // get the root cli
    const cli = this.consoleService.getCli()

    // // create a single command (See [npm commander arguments/options for more details])
    // this.consoleService.createCommand(
    //   {
    //     command: 'import:yaml <files...>',
    //     description: 'Import YAML application tree',
    //   },
    //   this.impYamlAppTrees,
    //   cli // attach the command to the cli
    // )

    // this.consoleService.createCommand(
    //   {
    //     command: 'import-xlsx:systems <files...>',
    //     description: 'Import ARIS system registry',
    //   },
    //   this.impSystemsXlsx,
    //   cli
    // )

    this.consoleService.createCommand(
      {
        command: 'imp:ci-tree-csv <files...>',
        description: 'Import CI Trees from .CSV files',
      },
      this.impCiTreeCsv,
      cli,
    )

    // // create a parent command container
    // const groupCommand = this.consoleService.createGroupCommand({
    //   command: 'new',
    //   description: 'A command to create an item'
    // },
    //   cli // attach the command to the root cli
    // )

    // // create command
    // this.consoleService.createCommand({
    //   command: 'file <name>',
    //   description: 'Create a file'
    // },
    //   this.createFile,
    //   groupCommand // attach the command to the group
    // )

    // // create an other sub command
    // this.consoleService.createCommand({
    //   command: 'directory <name>',
    //   description: 'Create a directory'
    // },
    //   this.createDirectory,
    //   groupCommand // attach the command to the group
    // )
  }

  // impYamlAppTrees = async (files: string[]) => this.impYamlService.importFromFiles(files)

  // impSystemsXlsx = async (files: string[]) => this.impXlsxService.impSystems(files)

  impCiTreeCsv = async (files: string[]) => this.impCsvService.importRunupCiFullTree(files)

  // createFile = async (name: string) => {
  //   console.log(`Creating a file named ${name}`)
  //   // your code...
  // }

  // createDirectory = async (name: string) => {
  //   console.log(`Creating a directory named ${name}`)
  //   // your code...
  // }
}
