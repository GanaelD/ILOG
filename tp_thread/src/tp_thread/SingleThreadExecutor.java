package tp_thread;

import java.util.concurrent.Executor;

public class SingleThreadExecutor implements Executor{
	
	protected Fifo fifo = new Fifo();
	
	public SingleThreadExecutor() {
		new Thread(new Runnable() {
			private Runnable getRunnable() {
				return (Runnable)fifo.get();
			}
			@Override
			public void run() {
				synchronized (fifo) {
					try {
						Runnable r;
						while ((r = getRunnable()) != null) {
							r.run();
						}					
					} catch (Exception e) {
						e.printStackTrace(System.err);
					}
					
				}
			}
		}).start();
	}

	@Override
	public void execute(Runnable command) {
		synchronized (fifo) {
			fifo.append(command);
		}
		
	}
	
}

