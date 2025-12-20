import { setProducts } from "../productSlice";

export const fetchProducts = () => async (dispatch) => {
  const controller = new AbortController();

  try {
    const res = await fetch("http://localhost:8008/api/products", {
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (!Array.isArray(data.data)) {
      console.error("Products data is not an array:", data);
      dispatch(setProducts([]));
      return;
    }

    dispatch(setProducts(data.data));
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error fetching products:", error);
      dispatch(setProducts([]));
    }
  }

  return () => controller.abort();
};
