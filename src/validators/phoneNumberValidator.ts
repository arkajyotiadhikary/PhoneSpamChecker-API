import { parsePhoneNumberFromString } from "libphonenumber-js";
import { type CountryCode } from "libphonenumber-js";
export const isValidPhoneNumber = (phoneNumber: string, countryCode?: CountryCode): boolean => {
      const phoneNumberObj = parsePhoneNumberFromString(
            phoneNumber,
            countryCode ? countryCode : "IN"
      );
      return phoneNumberObj ? phoneNumberObj.isValid() : false;
};
