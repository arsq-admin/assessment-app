import { publicGetAssessmentById } from "@/api/assessment";
import { FullPageLoading } from "@/components/FullPageLoading";
import { AssessmentContext } from "@/context";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const HomePage = () => {
  const { setAssessmentConfig } = useContext(AssessmentContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tenderPackageId = searchParams.get("package");
  const collectionId = searchParams.get("collection");
  const assessmentId = searchParams.get("id");

  const { data } = useQuery({
    queryKey: [tenderPackageId, collectionId, assessmentId],
    queryFn: publicGetAssessmentById,
    enabled: Boolean(tenderPackageId && collectionId && assessmentId),
  });

  //   useEffect(() => {
  //     if (data?.data.length === 1) {
  //       setAssessmentConfig(data.data[0]);
  //       navigate("/introduction");
  //     }
  //   }, [setAssessmentConfig, data, navigate]);

  return (
    <Box sx={{ p: "5rem 0" }}>
      <FullPageLoading />
    </Box>
  );
};
