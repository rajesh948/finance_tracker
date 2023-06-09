export const validationSchema = {
  name: [
    (value: string) => {
      if (!value?.trim()) {
        return "Please Enter Name";
      } else if (value?.length <= 3) {
        return "Name needs to be at least 3 characters.";
      }
      return true;
    },
  ],
  password: [
    (value: string) => {
      if (!value?.trim()) {
        return "Please Enter Password";
      } else if (value?.length <= 8 && !/[0-9-]+/.test(value)) {
        return "Password needs to be at least 8 digits.";
      }
      return true;
    },
  ],
  email: [
    (value: string) => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!value?.trim()) {
        return "Please Enter Email";
      } else if (!regex.test(value)) {
        return "Please Enter Valid Email";
      }
      return true;
    },
  ],
  amount: [
    (value: string) => {
      const regex = /^\d+$/;

      if (!value?.trim()) {
        return "Please Enter Amount";
      } else if (parseInt(value) <= 0) {
        return "please enter greater than zero amount";
      } else if (!regex.test(value)) {
        return "please enter numeric value only";
      }
      return true;
    },
  ],
  isRequired: [
    (value: string) => {
      if (!value?.trim()) {
        return "Please select ";
      }
      return true;
    },
  ],
  note: [
    (value: string) => {
      if (!value?.trim()) {
        return "Please write note ";
      } else if (value?.length > 250) {
        return "Please write less then 250 character";
      }
      return true;
    },
  ],
  image: [
    (value: Array<{ size: number }>) => {
      if (!value.length) {
        return "Please choose receipt";
      }
      if (value[0]?.size > 1024 * 1024) {
        return "please choose file which size is less then 1MB";
      }
      return true;
    },
  ],
};
