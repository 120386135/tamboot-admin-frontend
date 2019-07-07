public interface SystemUserMapper extends CommonMapper<SystemUserModel, Long> {
    @InsertConfig(autoInsertId=false)
    int insertCustom(SystemUserModel model);
}