import { publicGetAssessmentById } from "@/api/assessment";
import { publicGetTenderPackageById } from "@/api/tenderPackage";
import { FullPageLoading } from "@/components/FullPageLoading";
import { AssessmentContext, TenderPackageContext } from "@/context";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const HomePage = () => {
  const { setAssessmentConfig } = useContext(AssessmentContext);
  const { setTenderPackage } = useContext(TenderPackageContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tenderPackageId = searchParams.get("package");
  const collectionId = searchParams.get("collection");
  const assessmentId = searchParams.get("id");

  const { data: assessment } = useQuery({
    queryKey: [tenderPackageId, collectionId, assessmentId],
    queryFn: publicGetAssessmentById,
    enabled: Boolean(tenderPackageId && collectionId && assessmentId),
  });

  const { data: tenderPackage } = useQuery({
    queryKey: [tenderPackageId],
    queryFn: publicGetTenderPackageById,
    enabled: Boolean(tenderPackageId),
  });

  useEffect(() => {
    if (assessment?.data.length === 1 && tenderPackage?.data.length === 1) {
      setAssessmentConfig(assessment.data[0]);
      setTenderPackage(tenderPackage.data[0]);
      navigate("/introduction");
    }
  }, [
    setAssessmentConfig,
    assessment,
    navigate,
    tenderPackage,
    setTenderPackage,
  ]);

  return (
    <Box sx={{ p: "5rem 0" }}>
      <FullPageLoading />
    </Box>
  );
};
