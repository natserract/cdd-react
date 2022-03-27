
class Validation {
    static Regex = {
        emailPattern: /\S+@\S+\.\S+/,
        phonePattern: /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{1,4}[ .-]?\d{2,4}[ .-]?\d{2,8}/g
    }

    static Rules = {
        minLen: 6,
        maxLen: 20,
        maxLenMultiline: 120,
    }
}

export default Validation