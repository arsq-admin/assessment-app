import { QueryFunctionContext } from "@tanstack/react-query";
import { TENDER_PACKAGE_SERVICE_URL } from "../index";

export const publicGetTenderPackageById = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [tenderPackageId] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `${TENDER_PACKAGE_SERVICE_URL}/public/${tenderPackageId}`,
    {
      method: "GET",
      headers,
    }
  );

  return await res.json();
};
