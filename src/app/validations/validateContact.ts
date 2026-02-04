import { create, enforce, test } from "vest";

const suite = create(
  (data) => {
    test("firstName", "first name is required", () => {
      enforce(data.firstName).isNotBlank();
    });

    test("lastName", "last name is required", () => {
      enforce(data.lastName).isNotBlank();
    });

    test("phoneNumber", "phone number is required", () => {
      enforce(data.phoneNumber).isNotBlank();
    });

    test("email", "email is required", () => {
      enforce(data.email).isNotBlank();
    });
  },
  enforce.shape({
    firstName: enforce.isString(),
    lastName: enforce.isString(),
    phoneNumber: enforce.isString(),
    email: enforce.isString(),
  }),
);

export default suite;
