import re
import os

root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
html_files = []
for dirpath, dirnames, filenames in os.walk(root):
    for f in filenames:
        if f.lower().endswith('.html'):
            html_files.append(os.path.join(dirpath, f))

comment_re = re.compile(r'<!--([\s\S]*?)-->', re.MULTILINE)
header_re = re.compile(r'<header\b[^>]*>[\s\S]*?</header>', re.IGNORECASE)

changed = []

for path in html_files:
    with open(path, 'r', encoding='utf-8') as fh:
        s = fh.read()

    # find header spans
    preserve_spans = []
    for m in header_re.finditer(s):
        preserve_spans.append((m.start(), m.end()))

    # callback to decide whether to remove a comment
    def repl(m):
        start = m.start()
        # if comment inside any preserve span, keep it
        for a, b in preserve_spans:
            if start >= a and start < b:
                return m.group(0)
        # else remove (return empty string)
        return ''

    new_s = comment_re.sub(repl, s)

    if new_s != s:
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(new_s)
        changed.append(path)

print('Processed', len(html_files), 'HTML files')
if changed:
    print('Modified files:')
    for p in changed:
        print(p)
else:
    print('No files modified')
