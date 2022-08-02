import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { SystemVerificationResults } from './dto/system-verification-results.type'
import { SystemVerificationResults01 } from './dto/system-verification-results-01.type'
import { SystemTreeInclRollout } from './dto/system-tree-incl-rollout.type'
import { LatestVerificationRun } from './dto/latest-verification-run.type'
import { VerificationRuleResult } from './dto/verification-rule-result.type'
import { SystemType2StandardConnectionCount } from './dto/system-type-2-standard-connection-count.type'

@Injectable()
export class GacService {
  constructor(
    @InjectConnection('default') private readonly connection: Connection,
  ) {}

  getAllSystemsVerificationResults = async (): Promise<SystemVerificationResults[]> => {
    const allAsResults = (await this.connection.query('select as_name, connected_to_gac, smart_standard_name, smart_standard_version_number, start_date, rule_count, ok_count, err_count from v$_gac_rollout_as_last_results')).map((row: any) => {
      // console.log('row=', row)
      return {
        asName: row.as_name,
        connectedToGac: row.connected_to_gac ? true : false,
        smartStandardName: row.smart_standard_name,
        smartStandardVersion: row.smart_standard_version_number,
        verificationDate: row.start_date,
        ruleCount: row.rule_count,
        okCount: row.ok_count,
        errCount: row.err_count,
      }
    }) as SystemVerificationResults[]
    return allAsResults
  }

  getSystemsVerificationResults01 = async (): Promise<SystemVerificationResults01[]> => {
    const systemResults = (await this.connection.query(
      `select as_id, as_name, as_type, guid, ci_sm, ci_type, criticality_level, owner_block, owner_unit, as_architect_dit, dka_supervising_architect, block_architect, tribe, wave, connected_to_gac, vr_id, vr_finish_date, vr_status, vr_final_status, vr_standard_name, vr_standard_version_number, rule_count, err_count from v$_gac1_rollout_system_verification_results`)).map((row: any) => {
        // console.log('row=', row)
        return {
          asId: row.as_id,
          asName: row.as_name,
          asType: row.as_type,
          guid: row.guid,
          ciSm: row.ci_sm,
          ciType: row.ci_type,
          criticalityLevel: row.criticality_level,
          ownerBlock: row.owner_block,
          ownerUnit: row.owner_unit,
          asArchitectDit: row.as_architect_dit,
          dkaSupervisingArchitect: row.dka_supervising_architect,
          blockArchitect: row.block_architect,
          tribe: row.tribe,
          wave: row.wave,
          connectedToGac: row.connected_to_gac ? true : false,
          vrId: row.vr_id,
          vrStatus: row.vr_status,
          vrFinalStatus: row.vr_final_status,
          vrStandardName: row.vr_standard_name,
          vrStandardVersion: row.vr_standard_version_number,
          verificationDate: row.vr_finish_date,
          ruleCount: row.rule_count,
          errCount: row.err_count,
        }
      }) as SystemVerificationResults01[]
    return systemResults
  }

  getSystemTreeInclRollout = async (): Promise<SystemTreeInclRollout[]> => {
    const systree = (await this.connection.query(
      `select s.system_id, s.system_name, s.guid, s.ci_sm, s.system_type, s.system_type_text, s.parent_guid, s.criticality_level, s.owner_block, s.owner_unit, s.as_architect_dit, s.dka_supervising_architect, s.block_architect, s.tribe, s.wave from v$_gac1_system_tree_incl_rollout s`))
      .map((r: any) => {
        // console.log('row=', row)
        return {
          systemId: r.system_id,
          systemName: r.system_name,
          guid: r.guid,
          ciSm: r.ci_sm,
          systemTypeId: r.system_type,
          systemTypeText: r.system_type_text,
          parentGuid: r.parent_guid,
          criticalityLevel: r.criticality_level,
          ownerBlock: r.owner_block,
          ownerUnit: r.owner_unit,
          sysArchitectDit: r.as_architect_dit,
          entSupervisingArchitect: r.dka_supervising_architect,
          blockArchitect: r.block_architect,
          tribe: r.tribe,
          wave: r.wave,
        }
      }) as SystemTreeInclRollout[]
    return systree
  }

  getLatestVerificationRun = async (): Promise<LatestVerificationRun[]> => {
    const systree = (await this.connection.query(
      `select system_id, verification_run_id, standard_name, standard_version_number, start_date, status, rule_count, err_count from v$_gac1_latest_verification_run`))
      .map((r: any) => {
        // console.log('row=', row)
        return {
          systemId: r.system_id,
          verificationRunId: r.verification_run_id,
          standardName: r.standard_name,
          standardVersionNumber: r.standard_version_number,
          startDate: r.start_date,
          status: r.status,
          ruleCount: r.rule_count,
          errCount: r.err_count,
        }
      }) as LatestVerificationRun[]
    return systree
  }

  getVerificationRuleResults = async (
    verificationRunId: string,
  ): Promise<VerificationRuleResult[]> => {
    const systree = (await this.connection.query(
      `select id, standard_verification_run_id, rule_id, rule_name, rego_rule, message, status, report_message, rule_description, rule_architectural_requirement, uuid, final_status, dae_due_date, dae_jira_link, criticality, is_error from v$_gac1_rule_result_with_err_flag where standard_verification_run_id = $1`, [verificationRunId]))
      .map((r: any) => {
        // console.log('row=', row)
        return {
          id: r.id,
          standardVerificationRunId: r.standard_verification_run_id,
          ruleId: r.rule_id,
          ruleName: r.rule_name,
          regoRule: r.rego_rule,
          message: r.message,
          status: r.status,
          reportMessage: r.report_message,
          ruleDescription: r.rule_description,
          ruleArchitecturalRequirement: r.rule_architectural_requirement,
          uuid: r.uuid,
          finalStatus: r.final_status,
          daeDueDate: r.dae_due_date,
          daeJiraLink: r.dae_jira_link,
          criticality: r.criticality,
          isError: r.is_error,
        }
      }) as VerificationRuleResult[]
    return systree
  }

  getSystemStandardConnectionStats = async (): Promise<SystemType2StandardConnectionCount[]> => {
    const qResults = (await this.connection.query(
      `select uss.system_type, uss.system_type_text, uss.standard_id, uss.standard_name, count(*) connection_count
      from (
        select distinct st.guid, st.system_type, st.system_type_text, ss.id standard_id, ss.name standard_name
        from v$_gac1_system_tree st
        join gac1_process_definition pd on pd.as_id = st.system_id
        join gac1_process_definition_standards ds on ds.pd_id = pd.id
        left join gac1_smart_standard ss on ss.id = ds.ss_id
        where ss.name not in (
          'Критичные_требования_архитектурного_надзора_-_alpha',
          'Стандарт Platfrom Ready - DEMO',
          'GAC-2461 тест',
          'Стандарт_АПИ_2007',
          'Критичные_требования_арх_надзора_23_06_21',
          'Критичные требования_25_06_2021',
          'Стандарт API',
          'Экспериментальный стандарт(тест)'
        )
      ) uss
      group by uss.system_type, uss.system_type_text, uss.standard_id, uss.standard_name`))
      .map((r: any) => {
        // console.log('row=', row)
        return {
          systemTypeId: r.system_type,
          systemTypeText: r.system_type_text,
          standardId: r.standard_id,
          standardName: r.standard_name,
          connectionCount: r.connection_count,
        }
      }) as SystemType2StandardConnectionCount[]
    return qResults
  }
}
