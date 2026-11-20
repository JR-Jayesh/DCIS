"""Software engineering salary estimate matching the DCIS JavaScript logic."""

from __future__ import annotations

import argparse
import json


def estimate_software_salary(
    experience_years: float,
    certificate_count: int,
    github_score: float,
) -> dict[str, int]:
    tiers = [65000, 95000, 130000, 165000, 200000]

    if experience_years < 1:
        tier = 0
    elif experience_years < 3:
        tier = 1
    elif experience_years < 6:
        tier = 2
    elif experience_years < 10:
        tier = 3
    else:
        tier = 4

    base = tiers[tier]
    bonus = certificate_count * 2500 + (6000 if github_score > 70 else 0)
    return {"low": base + bonus, "high": round(base * 1.4 + bonus)}


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Estimate the DCIS software engineering salary range."
    )
    parser.add_argument("--experience", type=float, default=0)
    parser.add_argument("--certificates", type=int, default=0)
    parser.add_argument("--github-score", type=float, default=0)
    args = parser.parse_args()

    print(
        json.dumps(
            estimate_software_salary(
                args.experience,
                args.certificates,
                args.github_score,
            )
        )
    )


if __name__ == "__main__":
    main()
