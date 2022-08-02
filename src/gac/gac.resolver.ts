import { Resolver, Query, Args } from '@nestjs/graphql'

import { SystemVerificationResults } from './dto/system-verification-results.type'
import { SystemVerificationResults01 } from './dto/system-verification-results-01.type'
import { SystemTreeInclRollout } from './dto/system-tree-incl-rollout.type'
import { LatestVerificationRun } from './dto/latest-verification-run.type'
import { VerificationRuleResult } from './dto/verification-rule-result.type'
import { SystemType2StandardConnectionCount } from './dto/system-type-2-standard-connection-count.type'

import { GacService } from './gac.service'

@Resolver()
export class GacResolver {
  constructor(private readonly gacService: GacService) {}

  @Query(() => [SystemVerificationResults])
  getAllSystemsVerificationResults() {
    return this.gacService.getAllSystemsVerificationResults()
  }

  @Query(() => [SystemVerificationResults01])
  getSystemsVerificationResults01() {
    return this.gacService.getSystemsVerificationResults01()
  }

  @Query(() => [SystemTreeInclRollout])
  getSystemTreeInclRollout() {
    return this.gacService.getSystemTreeInclRollout()
  }

  @Query(() => [LatestVerificationRun])
  getLatestVerificationRun() {
    return this.gacService.getLatestVerificationRun()
  }

  @Query(() => [VerificationRuleResult])
  getVerificationRuleResults(
    @Args('verificationRunId') verificationRunId: string
  ) {
    return this.gacService.getVerificationRuleResults(verificationRunId)
  }

  @Query(() => [SystemType2StandardConnectionCount])
  getSystemStandardConnectionStats() {
    return this.gacService.getSystemStandardConnectionStats()
  }
}
