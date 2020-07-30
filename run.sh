#/bin/sh

###################################################################
# Shell script to build and run application on emulator or on TV. #
###################################################################

PROJECT_DIR=${TIZEN_ROOT_DIR}'/project'
PROFILE_DIR=~/tizen-studio-data/profile
BUILD_DIR='build'
OUTPUT_DIR='output'
EMULATOR_EXE=~/tizen-studio/tools/emulator/bin/em-cli
TIZEN_EXE=~/tizen-studio/tools/ide/bin/tizen
DEVICE_NAME='T-samsung-5.5-x86'
#DEVICE_NAME='UE43RU7475UXXC'
APP_ID='TkLO29RkmC.TV7'
BUILT_APP_NAME='TV7.wgt'
EXCLUDE_FROM_BUILD='run.sh build.sh misc/* .gitignore README.md LICENSE.md'

rm -rf ${BUILD_DIR} ${OUTPUT_DIR} ${BUILT_APP_NAME}

rm -rf ${PROFILE_DIR}/profiles.xml
cp misc/profiles.xml.bu ${PROFILE_DIR}/profiles.xml

${EMULATOR_EXE} launch --name ${DEVICE_NAME}
${TIZEN_EXE} build-web -e ${EXCLUDE_FROM_BUILD} -- ./ -out ${BUILD_DIR}
${TIZEN_EXE} package -t wgt -s MyProfile -- ${BUILD_DIR} -o ${OUTPUT_DIR}

${TIZEN_EXE} uninstall -p ${APP_ID} -t ${DEVICE_NAME}
${TIZEN_EXE} install -- ${OUTPUT_DIR} -n TV7.wgt -t ${DEVICE_NAME}
${TIZEN_EXE} run -p ${APP_ID} -t ${DEVICE_NAME}


