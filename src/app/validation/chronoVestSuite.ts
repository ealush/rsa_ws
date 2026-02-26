import { create, enforce, group, test, useWarn, warn, skipWhen, include, omitWhen } from "vest";
import { INITIAL_CHRONO_FORM } from "../components/chrono-portal/types";
import { getCongestion } from "../actions/congestionAction";
import { memo } from "vest/memo";
import debounce from "vest/exports/debounce";

const ChronoSchema = enforce.shape({

});

export type ChronosSchemaType  = {
    travelerName: string;
    mission: string;
    birthYear: string | number;
    destinationYear: string | number;
    plutoniumCores: string | number;
    suppressParadoxCheck?: boolean | null | undefined;
};

export const chronoVestSuite = create(function chronoSuite(data = INITIAL_CHRONO_FORM) {});
