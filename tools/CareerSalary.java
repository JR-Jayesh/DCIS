public class CareerSalary {
    public record SalaryEstimate(int low, int high) {}

    public static SalaryEstimate estimateSoftwareSalary(
        double experienceYears,
        int certificateCount,
        double githubScore
    ) {
        int[] tiers = {65000, 95000, 130000, 165000, 200000};
        int tier;

        if (experienceYears < 1) {
            tier = 0;
        } else if (experienceYears < 3) {
            tier = 1;
        } else if (experienceYears < 6) {
            tier = 2;
        } else if (experienceYears < 10) {
            tier = 3;
        } else {
            tier = 4;
        }

        int base = tiers[tier];
        int bonus = certificateCount * 2500 + (githubScore > 70 ? 6000 : 0);
        return new SalaryEstimate(base + bonus, (int) Math.round(base * 1.4 + bonus));
    }

    public static void main(String[] args) {
        double experienceYears = args.length > 0 ? Double.parseDouble(args[0]) : 0;
        int certificateCount = args.length > 1 ? Integer.parseInt(args[1]) : 0;
        double githubScore = args.length > 2 ? Double.parseDouble(args[2]) : 0;
        SalaryEstimate estimate = estimateSoftwareSalary(
            experienceYears,
            certificateCount,
            githubScore
        );
        System.out.printf(
            "{\"low\":%d,\"high\":%d}%n",
            estimate.low(),
            estimate.high()
        );
    }
}
