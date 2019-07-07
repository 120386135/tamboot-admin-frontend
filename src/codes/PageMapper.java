public interface SystemRoleMapper extends CommonMapper<SystemRoleModel, Long> {
    Page<SystemRoleModel> pageByCondition(@Param("pageNum") int pageNum, 
                                          @Param("pageSize") int pageSize, 
                                          @Param("condition") PageRoleCondition condition);
}