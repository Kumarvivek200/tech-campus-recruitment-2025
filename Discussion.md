execution - node extract_logs.js /path/to/logfile.txt 2024-12-01

Streaming Approach: The script reads the log file line by line to avoid high memory usage.
Filtering by Date: It checks if a line starts with the given date before writing it to the output file.
Efficient File Handling: Uses a single pass through the log file for efficiency.
Output Directory: Ensures logs are saved in a dedicated output directory.
