import { publicGetAssessmentById } from "@/api/assessment";
import { publicGetTenderPackageById } from "@/api/tenderPackage";
import { FullPageLoading } from "@/components/FullPageLoading";
import { AssessmentContext, TenderPackageContext } from "@/context";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PrepareAssessmentPage = () => {
  const { setAssessmentConfig } = useContext(AssessmentContext);
  const { setTenderPackage } = useContext(TenderPackageContext);
  const { urlId } = useParams();
  const navigate = useNavigate();

  const { data: assessment } = useQuery({
    queryKey: [urlId],
    queryFn: publicGetAssessmentById,
    enabled: Boolean(urlId),
  });

  const { tenderPackageId } = assessment?.data?.[0] || {};

  const { data: tenderPackage } = useQuery({
    queryKey: [tenderPackageId],
    queryFn: publicGetTenderPackageById,
    enabled: Boolean(tenderPackageId),
  });

  useEffect(() => {
    if (assessment?.data.length === 1 && tenderPackage?.data.length === 1) {
      setAssessmentConfig(assessment.data[0]);
      setTenderPackage(tenderPackage.data[0]);
      navigate(`/${urlId}/introduction`);
    }
  }, [
    setAssessmentConfig,
    assessment,
    navigate,
    tenderPackage,
    setTenderPackage,
    urlId,
  ]);

  return (
    <Box sx={{ p: "5rem 0" }}>
      <FullPageLoading />
    </Box>
  );
};
