import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function useNotLogin() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AuthAdmin.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (token) return token;
}
