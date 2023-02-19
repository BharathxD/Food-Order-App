import { useState } from "react";
import { ProductType } from "../Types/Product.types";
import { CheckoutType } from "../Types/Checkout.types";

interface IhttpConfig {
  url: string;
  method?: string;
  body?: CheckoutType;
  headers?: {};
}

export const useHTTP = ({
  url,
  method = "GET",
  body,
  headers,
}: IhttpConfig) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<ProductType[] | Response>([]);
  const fetchProductHandler = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: Response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: headers || {},
      });
      if (!response.ok)
        throw new Error(`${response.statusText} | ${response.status}`);
      if (method === "POST") {
        setFetchedData(response);
        setLoading(false);
        return;
      } else {
        const result: ProductType[] = await response.json();
        const loadedData = Object.entries(result).map(
          ([id, { name, description, price }]) => ({
            id,
            name,
            description,
            price,
          })
        );
        setFetchedData(loadedData);
      }
    } catch (e) {
      setError((e as DOMException).message);
    } finally {
      setLoading(false);
    }
  };
  return {
    isLoading: loading,
    hasError: error,
    responseData: fetchedData,
    useHttpHandler: fetchProductHandler,
  };
};
