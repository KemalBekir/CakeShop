import { useContext, useEffect, useState } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

const OwnerRoute = ({ children }) => {
    const { user , isAuthenticated } = useAuthContext();
}