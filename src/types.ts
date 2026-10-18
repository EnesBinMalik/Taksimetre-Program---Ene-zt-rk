export interface CalculationResult {
  km: number;
  baseFare: number; // 10 TL
  perKmFare: number; // 2.20 TL
  rawFare: number; // baseFare + (km * perKmFare)
  minFare: number; // 20 TL
  finalFare: number; // (rawFare < minFare) ? minFare : rawFare
  isMinFareApplied: boolean;
}

export interface TestCase {
  id: string;
  km: number;
  expectedRaw: number;
  expectedFinal: number;
  minFareApplied: boolean;
  scenario: string;
}

export interface CodeVersion {
  id: 'standard' | 'ifelse' | 'oop';
  title: string;
  description: string;
  filename: string;
  code: string;
}
