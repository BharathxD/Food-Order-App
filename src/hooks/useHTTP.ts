import { useState, useEffect } from "react";
import { ProductType } from "../Store/ProductType.types";

type httpArgumentsType = {
  url: string;
  method?: string;
  body?: ProductType;
  header?: {};
};

export const useHTTP = (httpArguments: httpArgumentsType, parseResult: (argo0: ProductType[]) => ProductType[]) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductType[]>([]);
  const fetchProductHandler = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: Response = await fetch(httpArguments.url, {
        method: httpArguments.method ? httpArguments.method : "GET",
        body: httpArguments.body ? JSON.stringify(httpArguments.body) : null,
        headers: httpArguments.header ? httpArguments.header : {},
      });
      if(!response.ok) throw new Error("Something went wrong");
      const result: ProductType[] = await response.json();
      let data = parseResult(result);
      setLoading(false);
      setProduct(data);
    } catch (e) {
      setError((e as DOMException).message);
    }
  };
  return {
    loading: loading,
    error: error,
    data: product,
    useHttpHandler: fetchProductHandler,
  };
};
