export enum TenderPackageStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETE = "COMPLETE", // This status is TBC
}

export interface PublicTenderPackage {
  name: string;
  id: string;
  allowImprovementPlan: boolean;
  submissionDeadline: string;
  referenceId: string;
  status: TenderPackageStatus;
  organisationId: string;
}
