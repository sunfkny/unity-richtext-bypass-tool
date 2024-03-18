import random

tags = ["color", "size", "b", "i", "quad"]
props = ["size"]


def convert_tag(tag_name: str):
    return "".join([chr(ord(char) + random.randint(2, 128) * 256) for char in tag_name])


def convert_html(html: str):
    for tag in tags:
        new_tag = convert_tag(tag)
        html = html.replace(f"<{tag}", f"<{new_tag}")
        html = html.replace(f"{tag}>", f"{new_tag}>")
    for prop in props:
        new_prop = convert_tag(prop)
        html = html.replace(f"{prop}=", f"{new_prop}=")
    return html


if __name__ == "__main__":
    s = convert_html("""
<b>粗体</b>
<i>斜体</i>
<color=#96e>颜色</color>
<size=50>大小</size>

<color=#96e><size=50><i><b>转圈圈~</b></i></size></color>

<quad size=50 />
""")
    print(s)
