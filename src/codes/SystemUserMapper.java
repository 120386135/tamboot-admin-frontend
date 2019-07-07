public interface SystemUserMapper extends CommonMapper<SystemUserModel, Long> {
    //不使用CommonMapper的方法时，实现自定义方法。
    int insertCustom(SystemUserModel model);
}
