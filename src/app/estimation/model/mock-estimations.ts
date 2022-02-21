import { BLACK_ON_WHITE_CSS_CLASS } from "@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector";
import { EstimationPage } from "./EstimationPage";

export const ESTIMATION_DATA: EstimationPage = {
    content: [
    {id: 1, created: new Date("02/02/2022 10:23:42"), 
    createdBy: {id: 1, username: "iciudade", mail: "blabla@bla", firstName: "Ivan", lastName: "Ciudad", 
        role: {id: 2, name: "User"}}
    , estVersion: "1.0", 
    project:{ id: 1, name: "Prueba", created: new Date("01/01/2022 23:43:23"), 
        createdBy: {id: 1, username: "iciudade", mail: "blabla@bla", firstName: "Ivan", lastName: "Ciudad", 
            role: {id: 2, name: "User"}},
        customer: {id: 1, name: "Cap"}}, 
    totalCost: 100000, totalDays: 23, lastUpdate: new Date("02/02/2022 23:59:34"), status: 1, showhours: true}
    ],
    pageable: {
        pageSize: 25,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 32
}