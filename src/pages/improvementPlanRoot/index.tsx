import { getMyImprovementActions } from "@/api/assessment";
import { UserContext } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ImprovementPlanContext } from "./context";
import { useImprovementPlan } from "./useImprovementPlan";
import { ImprovementAction } from "@/api/assessment/types";

export const ImprovementPlanRoot = () => {
  const { organisations } = useContext(UserContext);
  const { urlId = "" } = useParams();

  const { improvementPlan, setImprovementPlan } = useImprovementPlan();

  const { data } = useQuery({
    queryKey: [urlId, organisations[0]?.id],
    queryFn: getMyImprovementActions,
    enabled: Boolean(organisations[0]?.id) && Boolean(urlId),
  });

  useEffect(() => {
    if (data?.data) {
      const improvementActionByQuestionId: Record<string, ImprovementAction> =
        {};

      data.data.forEach((improvementAction) => {
        improvementActionByQuestionId[improvementAction.questionId] =
          improvementAction;
      });
    }
  }, [data]);

  return (
    <ImprovementPlanContext.Provider
      value={{
        improvementPlan,
        setImprovementPlan,
      }}
    >
      <Outlet />
    </ImprovementPlanContext.Provider>
  );
};
