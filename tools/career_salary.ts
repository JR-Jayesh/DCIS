export interface SalaryEstimate {
  low: number;
  high: number;
}

export function estimateSoftwareSalary(
  experienceYears: number,
  certificateCount: number,
  githubScore: number
): SalaryEstimate {
  const tiers = [65000, 95000, 130000, 165000, 200000];
  const tier = experienceYears < 1 ? 0
    : experienceYears < 3 ? 1
    : experienceYears < 6 ? 2
    : experienceYears < 10 ? 3
    : 4;
  const base = tiers[tier];
  const bonus = certificateCount * 2500 + (githubScore > 70 ? 6000 : 0);

  return {
    low: base + bonus,
    high: Math.round(base * 1.4 + bonus)
  };
}

if (typeof process !== "undefined" &&
    process.argv[1]?.replace(/\\/g, "/").endsWith("/tools/career_salary.ts")) {
  const experienceYears = Number(process.argv[2] ?? 0);
  const certificateCount = Number(process.argv[3] ?? 0);
  const githubScore = Number(process.argv[4] ?? 0);
  console.log(JSON.stringify(
    estimateSoftwareSalary(experienceYears, certificateCount, githubScore)
  ));
}
