import { QueryFunctionContext } from "@tanstack/react-query";
import { ASSESSMENT_SERVICE_URL } from "../index";

export const publicGetAssessmentById = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [tenderPackageId, collectionId, assessmentId] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `${ASSESSMENT_SERVICE_URL}/public/tender-package/${tenderPackageId}/collection/${collectionId}/assessment/${assessmentId}`,
    {
      method: "GET",
      headers,
    }
  );

  return await res.json();
};
