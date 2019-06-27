@Component
@JobHandler("testXxlJob")
public class TestXxlJob extends IJobHandler {
    private static final Logger logger = LoggerFactory.getLogger(TestXxlJob.class);

    @Override
    public ReturnT<String> execute(String s) throws Exception {
        logger.info("test xxl job is running");
        return ReturnT.SUCCESS;
    }
}