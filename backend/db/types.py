from enum import IntEnum
from typing import Type, Optional

from sqlalchemy import TypeDecorator, SmallInteger


class Enum(TypeDecorator[IntEnum]):
    cache_ok = True

    enum_type: Type[IntEnum]
    impl = SmallInteger()

    def __init__(self, enum_type: Type[IntEnum]):
        super().__init__()

        self.enum_type = enum_type


    @property
    def enum_values(self):
        return [v.value for v in self.enum_type.__members__.values()]

    def __repr__(self):
        return f'Enum(enums.{self.enum_type.__name__})'

    def process_bind_param(self, value: int | IntEnum | None, dialect):
        if value is None:
            return
        if isinstance(value, self.enum_type):
            return value.value
        if isinstance(value, int):
            return self.enum_type(value).value
        raise ValueError(f'"{value}" can`t process to "{repr(self)}"')

    def process_result_value(self, value: int | str | None, dialect) -> Optional[IntEnum]:
        if value is None:
            return None
        return self.enum_type(value)
