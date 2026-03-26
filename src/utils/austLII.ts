// AustLII 链接生成工具
// AustLII 官网: https://www.austlii.edu.au

// Migration Act 1958 的 AustLII URL 格式
const MIGRATION_ACT_BASE = 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115'

// Migration Regulations 1994 的 AustLII URL 格式
const MIGRATION_REG_BASE = 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_reg/mr1994218'

// Code of Conduct 的 AustLII URL 格式
const CODE_OF_CONDUCT_BASE = 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/oth/cormigagent2021r1'

// 从 reference 字符串提取法条并生成 AustLII 链接
export function generateAustLIIUrl(reference: string): string | null {
  const ref = reference.toLowerCase()

  // Migration Act 1958 - 提取 section 编号
  if (ref.includes('migration act') || ref.includes('ma1958') || ref.match(/s\.\d+[a-z]?/)) {
    const sectionMatch = ref.match(/s\.(\d+[a-z]?)/)
    if (sectionMatch) {
      return `${MIGRATION_ACT_BASE}/s${sectionMatch[1]}.html`
    }
    // 如果没有具体条款编号，返回总览页
    return 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115'
  }

  // Migration Regulations 1994 - 提取 regulation 编号
  if (ref.includes('migration regulations') || ref.includes('mr1994')) {
    const regMatch = ref.match(/reg\.?(\d+\.?\d*)/)
    if (regMatch) {
      return `${MIGRATION_REG_BASE}/reg${regMatch[1]}.html`
    }
    // 如果没有具体 regulation 编号，返回总览页
    return 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_reg/mr1994218'
  }

  // Code of Conduct for Registered Migration Agents 2021
  if (ref.includes('code of conduct') || ref.includes('cormigagent')) {
    return CODE_OF_CONDUCT_BASE
  }

  // Direction No. 90
  if (ref.includes('direction no. 90') || ref.includes('direction 90')) {
    return 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/mig_Direction_No90_2023'
  }

  // Direction No. 75
  if (ref.includes('direction no. 75') || ref.includes('direction 75')) {
    return 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/mig_Direction_No75_2023'
  }

  return null
}

// 常见法条别名映射
const COMMON_REFERENCES: Record<string, string> = {
  'migration act 1958 s.65': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s65.html',
  'migration act 1958 s.48': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s48.html',
  'migration act 1958 s.48a': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s48a.html',
  'migration act 1958 s.57': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s57.html',
  'migration act 1958 s.116': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s116.html',
  'migration act 1958 s.119': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s119.html',
  'migration act 1958 s.120': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s120.html',
  'migration act 1958 s.348': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s348.html',
  'migration act 1958 s.476': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s476.html',
  'migration act 1958 s.501': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s501.html',
  'migration act 1958 s.234': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s234.html',
  'migration act 1958 s.36': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s36.html',
  'migration act 1958 s.180a': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115/s180a.html',
  'migration act 1958': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_act/ma1958115',
  'migration regulations 1994': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/cth/consol_reg/mr1994218',
  'code of conduct for registered migration agents 2021': 'https://www.austlii.edu.au/cgi-bin/viewdoc/aulegis/oth/cormigagent2021r1',
}

export function getAustLIIUrl(reference: string): string {
  const normalizedRef = reference.toLowerCase().trim()

  // 先检查常见引用映射
  for (const [key, url] of Object.entries(COMMON_REFERENCES)) {
    if (normalizedRef.includes(key)) {
      return url
    }
  }

  // 否则使用通用生成函数
  return generateAustLIIUrl(reference) || 'https://www.austlii.edu.au'
}

// 解析题目中的法条引用并生成链接
export function extractAndLinkReferences(reference: string): { text: string; url: string | null }[] {
  const parts: { text: string; url: string | null }[] = []
  const ref = reference.trim()

  // 检查是否包含多个引用
  const sections = ref.split(/[,;&]/).map(s => s.trim()).filter(Boolean)

  for (const section of sections) {
    const url = getAustLIIUrl(section)
    parts.push({ text: section, url: url.startsWith('https://www.austlii.edu.au') ? url : null })
  }

  return parts
}
