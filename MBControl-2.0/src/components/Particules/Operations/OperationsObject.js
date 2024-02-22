import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { petitions } from "../../../services/api/petitions";

export const OperationsObject = () => {

  const [params] = useSearchParams();

  const email = params.get("email");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const parentOperationId = params.get("parentOperationId");

  const [object, setObject] = useState();

  const { getObject } = petitions();

  const onGettingObject = () => {
    parentOperationId
      ? getObject(
          `/operation?email=${""}&startDate=${""}&endDate=${""}&parentOperationId=${
            parentOperationId ? parentOperationId : ""
          }`,
          setObject
        )
      : getObject(
          startDate
            ? `/operation?email=${email ? email : ""}&startDate=${
                startDate ? startDate : ""
              }
      &endDate=${endDate ? endDate : ""}`
            : "/operation",
          setObject
        );
  };

  useEffect(() => {
    onGettingObject();
  }, []);

  let counter = 0;
  let updatedOperation = [];
  object?.forEach((item) => {
    const dateUTCCreated = new Date(item.createdAt);
    const dateLocalCreated = dateUTCCreated.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const dateUTCUpdated = new Date(item.updatedAt);
    const dateLocalUpdated = dateUTCUpdated.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    let element = {
      clientId: item.clientId,
      clientName: item.clientName,
      comisionPromoter: "$" + " " + item.comisionPromoter,
      comisionTotal: "$" + " " + item.comisionTotal,
      comisionUtilidadMB: "$" + " " + item.comisionUtilidadMB,
      companyId: item.companyId,
      companyName: item.companyName,
      completed:
        item.userName === "Totales"
          ? item.completed
            ? "Completado"
            : "En curso"
          : "",
      createdAt: item.userName !== "Totales" ? dateLocalCreated : "Totales",
      updatedAt: item.userName !== "Totales" ? dateLocalUpdated : "",
      excedente: "$" + " " + item.excedente,
      factura: item.factura,
      folio: item.userName !== "Totales" ? item.folio : "",
      id: item.id,
      isTotalRetorno:
        item.userName !== "Totales"
          ? item.isTotalRetorno
            ? "Total"
            : "Parcial"
          : "",
      iva: "$" + " " + item.iva,
      promoterId: item.promoterId,
      promoterName: item.promoterName,
      retornoTotalCliente:
        item.userName !== "Totales"
          ? item.models[0]?.retorno
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "$" + " " + item.retornoTotalCliente,
      subTotalOperacion: "$" + " " + item.subTotalOperacion,
      totalOperacion: "$" + " " + item.totalOperacion,
      costoProviderOutcome: "$" + " " + item.costoProviderOutcome,
      costoProviderIncome: "$" + " " + item.costoProviderIncome,
      realCost:
        "$" + " " + (item.costoProviderOutcome + item.costoProviderIncome),
      concentradora:
        "$" +
        " " +
        (item.comisionTotal -
          (item.costoProviderOutcome + item.costoProviderIncome)),
      userName: item.userName !== "Totales" ? item.userName : "",
      product: item.models[0]?.name,
      providerIncome:
        item.userName !== "Totales" ? item.models[0]?.providerIncomeName : "",
      clientPercent:
        item.userName !== "Totales"
          ? item.models[0]?.clientPercent
            ? item.models[0]?.clientPercent + " " + "%"
            : 0 + " " + "%"
          : "",
      comercialCostPercent:
        item.userName !== "Totales"
          ? item.models[0]?.comercialCostPercent
            ? item.models[0]?.comercialCostPercent + " " + "%"
            : 0 + " " + "%"
          : "",
      providerIncomePercent:
        item.userName !== "Totales"
          ? item.models[0]?.providerIncomePercent
            ? item.models[0]?.providerIncomePercent + " " + "%"
            : 0 + " " + "%"
          : "",
      providerOutcomePercent:
        item.userName !== "Totales"
          ? item.models[0]?.providerOutcomePercent
            ? item.models[0]?.providerOutcomePercent + " " + "%"
            : 0 + " " + "%"
          : "",
      providerOutcomeName: item.models[0]?.providerOutcomeName,
      ADR:
        item.userName !== "Totales"
          ? item.models[0]?.name === "ADR"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      CUCA:
        item.userName !== "Totales"
          ? item.models[0]?.name === "CUCA"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      Finpulso:
        item.userName !== "Totales"
          ? item.models[0]?.name === "Finpulso"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      Monedero:
        item.userName !== "Totales"
          ? item.models[0]?.name === "Monedero"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      Asimilado:
        item.userName !== "Totales"
          ? item.models[0]?.name === "Asimilado"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      Efectivo:
        item.userName !== "Totales"
          ? item.models[0]?.name === "Efectivo"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      TranferEx:
        item.userName !== "Totales"
          ? item.models[0]?.name === "TranferEx"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      CONSAR:
        item.userName !== "Totales"
          ? item.models[0]?.name === "CONSAR"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      SINDICATO:
        item.userName !== "Totales"
          ? item.models[0]?.name === "SINDICATO"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      TransferSim:
        item.userName !== "Totales"
          ? item.models[0]?.name === "TransferSim"
            ? "$" + " " + item.models[0]?.retorno
            : "$" + " " + 0
          : "",
      comercialCost: "$" + " " + item.comercialCost,
      g3Name: item.g3Name,
      position: counter,
    };
    updatedOperation.push(element);
    counter++;
  });
  return {updatedOperation,parentOperationId};
};
