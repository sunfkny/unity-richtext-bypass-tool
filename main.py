import random

tags = ["color", "size", "b", "i", "quad"]


def convert_tag(tag_name: str):
    return "".join([chr(ord(char) + random.randint(2, 128) * 256) for char in tag_name])


def convert_html(html: str):
    for tag in tags:
        new_tag = convert_tag(tag)
        html = html.replace(f"<{tag}", f"<{new_tag}")
        html = html.replace(f"{tag}>", f"{new_tag}>")
    return html


if __name__ == "__main__":
    s = convert_html("<color=#96e><size=50>转圈圈~</size></color>")
    print(s)
