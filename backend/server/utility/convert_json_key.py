import re


def convert_to_snake(key):
    snake_key = re.sub("([A-Z])", lambda x: "_" + x.group(1).lower(), key)
    return snake_key


def convert_to_camel(key):
    camel_key = re.sub("_(.)", lambda x: x.group(1).upper(), key)
    return camel_key
