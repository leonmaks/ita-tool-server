import { z } from 'zod'

export const CsvRec = z
  .object({
    // level: z
    //   .string()
    //   .regex(/\d+/)
    //   .transform(Number)
    //   .refine((n) => n >= 1),
    h_name: z
      .string()
      .min(1, { message: 'Cannot be empty' })
      .transform((v) => v.slice(-10)),
    type: z.string().min(1, { message: 'Cannot be empty' }),
    subtype: z.string().transform((v) => v || undefined),
    hpc_status: z.string().min(1, { message: 'Cannot be empty' }),
    environment: z.string().transform((v) => v || undefined),
    name: z.string().min(1, { message: 'Cannot be empty' }),
    ip_address_list: z.string().transform((v) => v || undefined),
    name2: z.string().transform((v) => v || undefined),
    j_cpu_proc_count: z.string().transform((v) => v || undefined),
    j_cpu_count: z.string().transform((v) => v || undefined),
    j_ram: z.string().transform((v) => v || undefined),
    j_hdd: z.string().transform((v) => v || undefined),
    j_ssd: z.string().transform((v) => v || undefined),
    tps_placement: z.string().transform((v) => v || undefined),
    // full_path: z.string().min(1, { message: 'Cannot be empty' }),
  })
  .strict()

export type CsvRecType = z.infer<typeof CsvRec>

export const csvRecParse = (r: unknown) => CsvRec.parse(r)
