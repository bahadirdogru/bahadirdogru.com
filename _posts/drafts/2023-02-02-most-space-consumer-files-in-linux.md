You can use the following command to show the largest files in the entire file system:

```bash	
find / -type f -printf '%s %p\n' | sort -nr | head -n 10
```

- find / specifies the root directory as the starting point for the search.
- -type f restricts the search to only files, not directories.
- -printf '%s %p\n' displays the size of the file, followed by its path.
- sort -nr sorts the output in reverse numerical order, so the largest files are shown first.
- head -n 10 limits the output to the top 10 largest files.

This will show you the 10 largest files in your file system, along with their paths and sizes. You can use this command to find the largest files in a specific directory by replacing / with the path to the directory you want to search.