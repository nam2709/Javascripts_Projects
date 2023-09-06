#!/bin/bash

# target_path = "/Users/admin/mps_truongnv1/h-lm-nghip/"
# source_path="/home/mps_truongnv1/data/MPS_QLKH/h-lm-nghip/"
# source_path="/Users/admin/mps_truongnv1/h-lm-nghip/"
# echo $source_path
# target_path="/data/DHLN/h-lm-nghip/"
# echo $target_path
# LIST_APP=( "Report/" "ScientificActivities/") 
# LIST_APP=("RunningTaskManagement/*" "EvaluateTaskManagement/*" "AnnouncedTaskManagement/*" "AdjustTaskManagement/*" "AcceptanceTaskManagement/*")

rsync --update --exclude="staticfiles" --exclude="mps-qlts-venv" --exclude="local_manage.py" --exclude="core/local_settings.py" --rsh='/usr/bin/sshpass -p mps@qlts#2023 ssh' -razv /home/hand/source/mps-qlts/* mps@10.196.197.54:/home/mps/qlts/

# for i in ${!LIST_APP[@]};
#   do 
#     echo "==================================${LIST_APP[$i]} START!SYNCINGG....=========================================================="
#     from_path = $source_path${LIST_APP[$i]}
#     echo $from_path
#     to_path = $target_path${LIST_APP[$i]}
#     echo $to_path
#     rsync --update -razv $from_path mps@27.72.195.145:$to_path
#     echo "==================================${LIST_APP[$i]} DONE!=========================================================="
#     123@123aA
#     Mpsolutions@123
 done
