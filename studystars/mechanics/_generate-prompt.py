#!/usr/bin/env python3
"""
Generate a complete v0 prompt for a given mechanic number.

Usage:
    python3 _generate-prompt.py 1              # prints prompt to stdout
    python3 _generate-prompt.py 1 | pbcopy     # copies to clipboard (macOS)
    python3 _generate-prompt.py 6 > /tmp/prompt.txt  # save to file
"""
import sys, re, glob, os

if len(sys.argv) < 2:
    print("Usage: python3 _generate-prompt.py <mechanic_number>")
    print("Example: python3 _generate-prompt.py 1")
    sys.exit(1)

num = sys.argv[1].zfill(2)
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Find matching files
json_files = glob.glob(f"{num}-*.json")
md_files = glob.glob(f"{num}-*.md")

if not json_files:
    print(f"Error: No JSON file found for mechanic {num}", file=sys.stderr)
    sys.exit(1)
if not md_files:
    print(f"Error: No MD file found for mechanic {num}", file=sys.stderr)
    sys.exit(1)

json_file = json_files[0]
md_file = md_files[0]
mechanic_name = json_file.replace(f"{num}-", "").replace(".json", "")

with open("_prototype-styleguide.md") as f:
    styleguide = f.read()
with open(json_file) as f:
    spec = f.read()
with open(md_file) as f:
    description = f.read()

# Read the prompt template and extract the prompt block
with open("_v0-prompt.md") as f:
    template = f.read()

match = re.search(r'## The Prompt\s*```\s*\n(.*?)```', template, re.DOTALL)
if not match:
    print("Error: Could not find prompt template block in _v0-prompt.md", file=sys.stderr)
    sys.exit(1)

prompt = match.group(1)
prompt = prompt.replace("{{STYLEGUIDE}}", styleguide)
prompt = prompt.replace("{{MECHANIC_JSON}}", spec)
prompt = prompt.replace("{{MECHANIC_MD}}", description)

print(f"# Generated prompt for mechanic #{num}: {mechanic_name}")
print(f"# Files: {json_file}, {md_file}")
print(f"# ---\n")
print(prompt)
