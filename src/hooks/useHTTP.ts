import { useState, useEffect } from "react";
import { ProductType } from "../Store/ProductType.types";
import { CheckoutType } from "../Store/Checkout.types";

type httpArgumentsType = {
  url: string;
  method?: string;
  body?: CheckoutType;
  header?: {};
};

export const useHTTP = (httpArguments: httpArgumentsType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductType[] | Response>([]);
  const fetchProductHandler = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: Response = await fetch(httpArguments.url, {
        method: httpArguments.method ? httpArguments.method : "GET",
        body: httpArguments.body ? JSON.stringify(httpArguments.body) : null,
        headers: httpArguments.header ? httpArguments.header : {},
      });
      if (!response.ok) throw new Error("Something went wrong");
      if (httpArguments.method == "POST") {
        setProduct(response);
        setLoading(false);
        return;
      } else {
        const result: ProductType[] = await response.json();
        let loadedMeals: ProductType[] = [];
        for (const key in result) {
          loadedMeals.push({
            id: key,
            name: result[key].name,
            description: result[key].description,
            price: result[key].price,
          });
        }
        setLoading(false);
        setProduct(loadedMeals);
      }
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
