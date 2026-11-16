export const MYSQL_ERROR_MAP = {
  // 409 Conflict — нарушение уникальности (например, email в users)
  ER_DUP_ENTRY: {
    status: 409,
    message: 'Запись с такими уникальными данными уже существует',
  },

  // 422 Unprocessable Entity — ошибки бизнес-логики и ограничений колонок
  ER_NO_REFERENCED_ROW_2: {
    status: 422,
    message: 'Указана несуществующая связанная сущность (например, владелец продукта не найден)',
  },
  ER_BAD_NULL_ERROR: {
    status: 422,
    message: 'Не передано одно из обязательных полей',
  },
  ER_NO_DEFAULT_FOR_FIELD: {
    status: 422,
    message: 'Отсутствует обязательное поле без значения по умолчанию',
  },
  ER_DATA_TOO_LONG: {
    status: 422,
    message: 'Превышена максимальная длина текста (максимум 255 символов)',
  },
  ER_WARN_DATA_OUT_OF_RANGE: {
    status: 422,
    message: 'Числовое значение выходит за допустимые пределы (например, слишком большая цена)',
  },
  WARN_DATA_TRUNCATED: {
    status: 422,
    message: 'Недопустимое значение для перечисления (например, некорректная роль пользователя)',
  },

  // 400 Bad Request — передан неверный тип данных
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: {
    status: 400,
    message: 'Неверный формат или тип данных (например, строка вместо числа)',
  },
  ER_WRONG_VALUE_COUNT_ON_ROW: {
    status: 400,
    message: 'Некорректное количество переданных полей',
  },
};

