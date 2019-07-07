public interface SystemPermissionMapper extends CommonMapper<SystemPermissionModel, Long> {
    SystemPermissionModel selectOneByUrl(String url);
}
